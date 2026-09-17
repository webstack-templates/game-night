import Link from "next/link";
import { notFound } from "next/navigation";
import { logPlay } from "@/app/actions";
import { getSql, type Game, type Play } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = Number(id);
  if (!gameId) notFound();

  const sql = getSql();
  const [game] = (await sql`SELECT * FROM games WHERE id = ${gameId}`) as Game[];
  if (!game) notFound();

  const plays = (await sql`
    SELECT id, game_id, played_on::text AS played_on, player_count, winner, notes
    FROM plays
    WHERE game_id = ${gameId}
    ORDER BY played_on DESC, id DESC
  `) as Play[];

  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm underline">
        Back
      </Link>

      <h1 className="mt-6 text-2xl font-semibold">{game.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        {game.min_players}–{game.max_players} players
        {game.play_minutes ? ` · ${game.play_minutes} min` : ""}
      </p>

      <h2 className="mt-8 text-lg font-medium">Log a play</h2>
      <form action={logPlay} className="mt-3 space-y-3">
        <input type="hidden" name="gameId" value={game.id} />
        <div className="flex gap-3">
          <input
            name="playedOn"
            type="date"
            defaultValue={today}
            required
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="playerCount"
            type="number"
            min={1}
            placeholder="Players"
            className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="winner"
            placeholder="Winner"
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <textarea
          name="notes"
          placeholder="Notes"
          rows={2}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <div>
          <button type="submit" className="text-sm underline">
            Save
          </button>
        </div>
      </form>

      <h2 className="mt-10 text-lg font-medium">Plays</h2>
      {plays.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">Not played yet.</p>
      ) : (
        <ul className="mt-2 divide-y divide-gray-200">
          {plays.map((play) => (
            <li key={play.id} className="py-3 text-sm">
              <div>
                <span className="font-medium">{play.played_on}</span>
                {play.winner ? ` · ${play.winner} won` : ""}
                {play.player_count ? ` · ${play.player_count} players` : ""}
              </div>
              {play.notes ? (
                <p className="mt-1 text-gray-600">{play.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
