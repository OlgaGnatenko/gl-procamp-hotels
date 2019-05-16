import { Weather } from "./weather.model";
import { Profile } from "./profile.model";
import { Comment } from "./comment.model";

export type Hotel = {
  id: number;
  title: string;
  address: string;
  description: string;
  phone: string;
  picture: string;
  photos: [string, string];
  weather: Weather;
  profile: Profile;
  stars: number;
  comments?: Comment[];
};
