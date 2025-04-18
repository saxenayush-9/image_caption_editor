import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fabric } from "fabric";
import "./EditPage.css";

function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.image;
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!imageUrl) {
      navigate("/");
      return;
    }

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 400,
    });

    // Load the image with CORS enabled
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.set({ selectable: false });
        newCanvas.add(img);
        newCanvas.sendToBack(img);
        newCanvas.renderAll();
      },
      { crossOrigin: "anonymous" }
    );

    setCanvas(newCanvas);
    return () => newCanvas.dispose();
  }, [imageUrl, navigate]);

  const addText = () => {
    const text = new fabric.IText("Edit me", {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "black",
    });
    canvas.add(text);
    console.log("Canvas JSON:", canvas.toJSON());
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 30,
          fill: "red",
          left: 70,
          top: 70,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 60,
          height: 60,
          fill: "green",
          left: 100,
          top: 100,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 80,
          height: 50,
          fill: "blue",
          left: 130,
          top: 130,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 200, y: 0 },
            { x: 250, y: 50 },
            { x: 225, y: 100 },
            { x: 175, y: 100 },
            { x: 150, y: 50 },
          ],
          { fill: "orange", left: 150, top: 150 }
        );
        break;
      default:
        return;
    }
    canvas.add(shape);
    console.log("Canvas JSON:", canvas.toJSON());
  };

  const handleDownload = () => {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified-image.png";
    link.click();
  };

  return (
    <div className="edit-container">
      <canvas ref={canvasRef} />
      <div className="tools">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("polygon")}>Add Polygon</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default EditPage;
