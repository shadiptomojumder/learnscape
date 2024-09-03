export type UserType = {
    _id: string; // Assuming you're using ObjectId as a string
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone?: string; // Optional phone number (could be null)
    role: string;
    bio?: string; // Optional bio (could be null)
    socialMedia?: {
        twitter?: string; // Optional social media links (could be null)
        linkedin?: string;
        facebook?: string;
    };
    profilePicture: string;
    designation?: string; // Optional designation (could be null)
};
