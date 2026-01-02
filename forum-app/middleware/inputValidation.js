/**
 * Input Validation Middleware
 * Protects against deeply nested objects and arrays that could cause memory exhaustion
 */

/**
 * Check if an object has excessive nesting depth
 * @param {*} obj - Object to check
 * @param {number} maxDepth - Maximum allowed depth (default: 5)
 * @param {number} currentDepth - Current depth level
 * @returns {boolean} - True if depth exceeds limit
 */
function hasExcessiveNesting(obj, maxDepth = 5, currentDepth = 0) {
  if (currentDepth > maxDepth) {
    return true;
  }

  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (hasExcessiveNesting(obj[key], maxDepth, currentDepth + 1)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Count total number of parameters (including nested)
 * @param {*} obj - Object to count
 * @returns {number} - Total parameter count
 */
function countParameters(obj) {
  let count = 0;

  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        count++;
        if (typeof obj[key] === 'object') {
          count += countParameters(obj[key]);
        }
      }
    }
  }

  return count;
}

/**
 * Middleware to validate request body against malicious nested structures
 */
const validateInput = (req, res, next) => {
  try {
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return next();
    }

    // Check for excessive nesting (protection against qs bypass)
    if (hasExcessiveNesting(req.body, 5)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body contains excessive nesting depth'
      });
    }

    // Check for excessive number of parameters
    const paramCount = countParameters(req.body);
    if (paramCount > 1000) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body contains too many parameters'
      });
    }

    // Check for suspicious array patterns
    for (let key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        // Detect arrays with numeric string keys (potential bracket notation exploit)
        if (Array.isArray(req.body[key]) && req.body[key].length > 100) {
          return res.status(400).json({
            error: 'Bad Request',
            message: 'Request contains suspicious array patterns'
          });
        }
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid request body structure'
    });
  }
};

/**
 * Sanitize specific fields for authentication
 */
const sanitizeAuthInput = (req, res, next) => {
  if (req.body.username) {
    // Ensure username is a string, not an object or array
    if (typeof req.body.username !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username must be a string'
      });
    }
    // Trim and limit length
    req.body.username = req.body.username.trim().substring(0, 100);
  }

  if (req.body.password) {
    // Ensure password is a string
    if (typeof req.body.password !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Password must be a string'
      });
    }
    // Limit length but don't trim (preserve spaces in password)
    req.body.password = req.body.password.substring(0, 200);
  }

  next();
};

/**
 * Sanitize post and comment input
 */
const sanitizePostInput = (req, res, next) => {
  if (req.body.title !== undefined) {
    if (typeof req.body.title !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Title must be a string'
      });
    }
    req.body.title = req.body.title.trim().substring(0, 200);
  }

  if (req.body.content !== undefined) {
    if (typeof req.body.content !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Content must be a string'
      });
    }
    req.body.content = req.body.content.trim().substring(0, 10000);
  }

  if (req.body.comment !== undefined) {
    if (typeof req.body.comment !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Comment must be a string'
      });
    }
    req.body.comment = req.body.comment.trim().substring(0, 5000);
  }

  next();
};

module.exports = {
  validateInput,
  sanitizeAuthInput,
  sanitizePostInput
};
