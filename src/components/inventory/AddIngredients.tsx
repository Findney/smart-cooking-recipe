"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getUser } from "@/actions/auth";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddIngredientPopup = ({ isOpen, onClose, onSave }: Props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [units, setUnits] = useState<string[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    async function fetchUnits() {
      const { data, error } = await supabase.rpc("get_enum_labels", {
        enum_name: "enum_unit",
      });
      if (error) {
        console.error("Error fetching enum labels:", error);
        return;
      }
      if (data) {
        setUnits(data.map((item: { enumlabel: string }) => item.enumlabel));
      }
    }
    fetchUnits();

    supabase.from("ingredients").select("name").then(({ data }) => {
      if (data) setNameSuggestions(data.map(i => i.name));
    });
  }, [isOpen]);

  const handleSubmit = async () => {
    const user = await getUser()

    if (!name || !quantity || !unit || !expiryDate || !user) {
      alert("Missing field(s)");
      return
    };

    // 1. Check if ingredient exists
    const { data: existingIngredients, error: checkError } = await supabase
      .from("ingredients")
      .select("ingredient_id")
      .eq("name", name)
      // .eq("unit", unit)
      .maybeSingle();

    let ingredientId;

    if (checkError && checkError.code !== "PGRST116") {
      alert("Error checking existing ingredient");
      return;
    }

    if (existingIngredients) {
      ingredientId = existingIngredients.ingredient_id;
    } else {
      const { data: newIngredient, error: insertError } = await supabase
        .from("ingredients")
        .insert({ name: name, unit: unit })
        .select("ingredient_id")
        .single();

      if (insertError) {
        alert("Failed to insert new ingredient");
        return;
      }

      ingredientId = newIngredient.ingredient_id;
    }

    // Insert into inventory
    const { error: inventoryError } = await supabase.from("inventory").insert({
      user_id: user.id,
      ingredient_id: ingredientId,
      quantity: parseFloat(quantity),
      expiration_date: expiryDate,
      added_at: new Date().toISOString().split("T")[0],
    });

    if (inventoryError) {
      alert("Failed to add ingredient to inventory");
      return;
    }

    // Clear fields
    setName("");
    setQuantity("");
    setUnit("");
    setExpiryDate("");

    alert("Ingredient successfully added");
    onSave();
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="text-gray-400 fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold">×</button>
        <h2 className="text-black text-xl font-semibold mb-4">Add New Ingredient</h2>

        <input
          type="text"
          placeholder="Ingredient Name"
          value={name}
          onChange={e => setName(e.target.value)}
          list="ingredient-suggestions"
          className="w-full border px-3 py-2 mb-2 rounded"
        />
        <datalist id="ingredient-suggestions">
          {nameSuggestions.map((s, idx) => <option key={idx} value={s} />)}
        </datalist>

        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Qty"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="w-1/2 border px-3 py-2 rounded"
          />
          <select
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="w-1/2 border px-3 py-2 rounded"
          >
            <option value="" disabled>Select unit</option>
            {units.map((u, idx) => (
              <option key={idx} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <input
          type="date"
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          Save Ingredient
        </button>
      </div>
    </div>
  );
};

export default AddIngredientPopup;
