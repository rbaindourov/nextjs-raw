// app/api/users/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();


    const result = await db.insert(users)
      .values({
        name    
      })
      .$returningId();
    
    if (result) {
      const [newUser] = await db.select().from(users).where(eq(users.id, result[0].id));
      return NextResponse.json(newUser, { status: 201 });
    }
    
    return NextResponse.json(
      { error: "Failed to create user - no ID returned" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
