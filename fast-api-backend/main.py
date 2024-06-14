from fastapi import Depends, FastAPI, HTTPException 
from sqlalchemy.orm import Session 

from . import controllers, models, schemas 
from .database import SessionLocal, engine 

from .my import get_db  

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#helper function that will be used as a dependency to check if the db is up 
#def get_db(): 
#    db = SessionLocal()
#    try: 
#        yield db 
#    finally: 
#        db.close() 
    
#GET all items 
@app.get("/items/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)): 
    items = controllers.get_items(db, skip=skip, limit=limit) 
    return items 

#GET item by ID 
@app.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = controllers.get_item(db, item_id=item_id)
    if db_item is None: 
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item
    
#POST item new item 
@app.post("/items/", response_model=schemas.Item) 
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)): 
     return controllers.create_item(db=db, item=item)

#PUT -> updating an item 
@app.put("/items/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)): 
    db_item = controllers.update_item(db, item_id=item_id, item=item)
    if db_item is None: 
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

#DELETE -> removing an item by ID 
@app.delete("/items'{item_id}", response_model=schemas.Item)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = controllers.delete_item(db, item_id=item_id)
    if db_item is None: 
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item
