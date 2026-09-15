import { neon } from "@neondatabase/serverless";

export type Game = {
  id: number;
  title: string;
  min_players: number;
  max_players: number;
  play_minutes: number | null;
  added_at: string;
};

export type Play = {
  id: number;
  game_id: number;
  played_on: string;
  player_count: number | null;
  winner: string | null;
  notes: string | null;
};

export function getSql() {
  return neon(process.env.DATABASE_URL!);
}
