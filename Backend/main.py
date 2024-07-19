# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your custom YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='weights/best.pt')

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ['image/jpeg', 'image/png']:
        raise HTTPException(status_code=400, detail="Invalid file type")

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')

    results = model(image)
    predictions = results.xyxy[0].tolist()

    formatted_predictions = [
        {
            "x1": pred[0],
            "y1": pred[1],
            "x2": pred[2],
            "y2": pred[3],
            "confidence": pred[4],
            "class": int(pred[5]),
            "class_name": model.names[int(pred[5])]
        }
        for pred in predictions
    ]

    return JSONResponse(content={"predictions": formatted_predictions})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
