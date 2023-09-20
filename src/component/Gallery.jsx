import React, { useState, useEffect } from "react";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import image5 from "../images/image5.jpg";
import image6 from "../images/image6.jpg";
import image7 from "../images/image7.jpg";
import image8 from "../images/image8.jpg";
import image9 from "../images/image9.jpg";
import image10 from "../images/image10.jpg";
import image11 from "../images/image11.jpg";
import image12 from "../images/image12.jpg";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem.jsx";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function Gallery() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const imagesData = [
    {
      id: 1,
      image: image1,
      tag: "Winter",
    },
    {
      id: 2,
      image: image2,
      tag: "Summer",
    },
    {
      id: 3,
      image: image3,
      tag: "Summer",
    },
    {
      id: 4,
      image: image4,
      tag: "Winter",
    },
    {
      id: 5,
      image: image5,
      tag: "Winter",
    },
    {
      id: 6,
      image: image6,
      tag: "Summer",
    },
    {
      id: 7,
      image: image7,
      tag: "Short",
    },
    {
      id: 8,
      image: image8,
      tag: "Winter",
    },
    {
      id: 9,
      image: image9,
      tag: "Summer",
    },
    {
      id: 10,
      image: image10,
      tag: "Short",
    },
    {
      id: 11,
      image: image11,
      tag: "Summer",
    },
    {
      id: 12,
      image: image12,
      tag: "Summer",
    },
  ];

  const handleSearch = () => {
    const filteredImages = imagesData.filter((image) =>
      image.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(filteredImages.map((item) => item.id));
  };

  return (
    <div className="body-cont2">
      {user ? (
        <div className="container">
          <div className="title">
            <h1>Welcome, {user.email}!</h1>
            <div className="searchbox">
              <input
                type="text"
                placeholder="Search by tag"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className="logout">
              <Link to="/">Logout</Link>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="courses__container">
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((id) => (
                    <SortableItem
                      key={id}
                      id={id}
                      itemData={imagesData.find((item) => item.id === id)}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          )}
        </div>
      ) : (
        <div className="logout__details">
          <p>
            Please,{" "}
            <Link to="/login" className="inline-link">
              Log in
            </Link>{" "}
            to access the gallery.
          </p>
        </div>
      )}
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default Gallery;
