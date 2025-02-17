// src/app/pages/about.tsx
import type { NextPage } from "next";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export default async function About() {
    // Fetch users from the database
    const allUsers = await db.select().from(users);

    // Server Action to add a user
    async function addUser(formData: FormData) {
        "use server";
        const name = formData.get("name")?.toString();
        if (!name) return;
        await db.insert(users).values({ name });
        // Revalidate the page to reflect the new user
        revalidatePath("/");
    }

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>User List</h1>
            <ul>
                {allUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            <h2>Add a New User</h2>
            <form action={addUser} style={{ marginTop: "1rem" }}>
                <input
                    name="name"
                    type="text"
                    placeholder="Enter user name"
                    required
                    style={{ marginRight: "0.5rem" }}
                />
                <button type="submit">Add User</button>
            </form>
        </main>
    );
}
