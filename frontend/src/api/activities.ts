import axios from "axios";

export interface Activity {
    id: number;
    title: string;
    description: string;
    image_url: string;
    min_people: number;
    max_people: number;
}

export async function getActivities(): Promise<Activity[]> {
    const res = await axios.get("http://127.0.0.1:8000/api/activities/");
    return res.data;
}
