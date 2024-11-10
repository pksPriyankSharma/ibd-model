from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
import numpy as np

app = FastAPI()

# Load your model
print('===> Trying to load the model')
model = tf.keras.models.load_model('ibd_image_classification_model_14-Oct-2024-09-37-45.keras')
print("===> Model loaded successfully")
# Define request schema
class ModelInput(BaseModel):
    inputs: list

@app.get('')
async def healthCheck(data):
    try:
        return {"status":True, "message":"Server is running"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(data: ModelInput):
    try:
        # Convert input to numpy array
        input_values = np.array(data.inputs)
        # Run prediction
        prediction = model.predict(input_values)
        # Return response as JSON
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
    print('===> Model server running on http://localhost:5000')
