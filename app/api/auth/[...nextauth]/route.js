import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) { // This function receives a profile object
            try {
                // This is a serverless function
                // This means that every time it gets called it needs to re-establish a connection to the database
                console.log('Connecting to db');
                await connectToDB();
                console.log('passed connection');
                // We need to check if the user already exists to sign him in
                const userExists = await User.findOne({ email: profile.email });
                console.log('passed userExists');
                // If the user doesn't exist, we need to create a new user
                if (!userExists) {
                    // We create a new user
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                    console.log('passed create user');
                }
                // at the end we can return true
                console.log('returnign true');
                return true;
            } catch (error) {
                // if somethign fails we log the error and return false
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }