import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { id, image, tag } = props.itemData;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="course">
        <div>
          <img src={image} alt={tag} />
        </div>
        <p>{tag}</p>
      </div>
    </div>
  );
}

export default SortableItem;
