import Link from "next/link";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

type GameRow = {
  id: number;
  title: string;
  min_players: number;
  max_players: number;
  play_minutes: number | null;
  play_count: number;
  last_played: string | null;
};

export default async function Home() {
  const sql = getSql();
  const games = (await sql`
    SELECT g.id, g.title, g.min_players, g.max_players, g.play_minutes,
           COUNT(p.id)::int AS play_count,
           MAX(p.played_on)::text AS last_played
    FROM games g
    LEFT JOIN plays p ON p.game_id = g.id
    GROUP BY g.id
    ORDER BY last_played DESC NULLS LAST, g.title
  `) as GameRow[];

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Game night</h1>
        <Link href="/games/new" className="text-sm underline">
          Add a game
        </Link>
      </div>

      {games.length === 0 ? (
        <p className="text-sm text-gray-500">
          The shelf is empty. Add the first game.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {games.map((game) => (
            <li key={game.id} className="py-3">
              <Link href={`/games/${game.id}`} className="hover:underline">
                <span className="font-medium">{game.title}</span>
              </Link>
              <div className="mt-1 text-xs text-gray-500">
                {game.min_players}–{game.max_players} players
                {game.play_minutes ? ` · ${game.play_minutes} min` : ""}
                {" · "}
                {game.play_count === 1 ? "1 play" : `${game.play_count} plays`}
                {game.last_played ? ` · last ${game.last_played}` : ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
