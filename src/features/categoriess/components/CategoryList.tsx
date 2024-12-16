import React from "react";
import { CategoryDto } from "../../../Application/dto/CategoryDto";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: CategoryDto[];
  onEditClick: (category: CategoryDto) => void;
  onDelete: (categoryId: string) => void;
  isEditing: string | null;
  formData: Partial<CategoryDto>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEditClick,
  onDelete,
  isEditing,
  formData,
  onChange,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <ul>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onEditClick={onEditClick}
          onDelete={onDelete}
          isEditing={isEditing === category.id}
          formData={formData}
          onChange={onChange}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
