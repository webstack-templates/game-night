"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";

export async function addGame(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const minPlayers = Number(formData.get("minPlayers") || 1);
  const maxPlayers = Number(formData.get("maxPlayers") || 4);
  const minutesValue = formData.get("playMinutes");
  const playMinutes = minutesValue ? Number(minutesValue) : null;

  if (!title) return;

  const sql = getSql();
  await sql`
    INSERT INTO games (title, min_players, max_players, play_minutes)
    VALUES (${title}, ${minPlayers}, ${maxPlayers}, ${playMinutes})
  `;

  revalidatePath("/");
  redirect("/");
}

export async function logPlay(formData: FormData) {
  const gameId = Number(formData.get("gameId"));
  const playedOn = String(formData.get("playedOn") ?? "");
  const countValue = formData.get("playerCount");
  const playerCount = countValue ? Number(countValue) : null;
  const winner = String(formData.get("winner") ?? "").trim() || null;
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!gameId || !playedOn) return;

  const sql = getSql();
  await sql`
    INSERT INTO plays (game_id, played_on, player_count, winner, notes)
    VALUES (${gameId}, ${playedOn}, ${playerCount}, ${winner}, ${notes})
  `;

  revalidatePath(`/games/${gameId}`);
  revalidatePath("/");
}
