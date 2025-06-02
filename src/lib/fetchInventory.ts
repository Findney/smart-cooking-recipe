import { supabase } from "./supabaseClient";

export async function fetchExpiringInventory() {
    const today = new Date().toISOString().split("T")[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

    const { data, error } = await supabase
        .from("inventory")
        .select(`
            inventory_id,
            quantity,
            expiration_date,
            ingredients (
              ingredient_id,
              name,
              unit
            )
        `)
        .gte("expiration_date", today)
        .lte("expiration_date", nextWeek);

    if (error) throw error;
    return data;
}
