import Link from "next/link";
import { addGame } from "@/app/actions";

export default function NewGamePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm underline">
        Back
      </Link>

      <h1 className="mt-6 text-2xl font-semibold">Add a game</h1>

      <form action={addGame} className="mt-6 space-y-3">
        <input
          name="title"
          placeholder="Title"
          required
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <div className="flex gap-3">
          <input
            name="minPlayers"
            type="number"
            min={1}
            placeholder="Min players"
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="maxPlayers"
            type="number"
            min={1}
            placeholder="Max players"
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            name="playMinutes"
            type="number"
            min={1}
            placeholder="Minutes"
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
        <div>
          <button type="submit" className="text-sm underline">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
