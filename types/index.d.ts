declare global {
  type Occurrence = {
    id: number;
    starts_on: string;
    start_time: string;
    events: LSFEvent;
    participations: Participation[];
  };

  type LSFEvent = {
    id: number;
    name: string;
    location_name: string;
    longitude: number;
    latitude: number;
  };

  type Participation = {
    id: number;
    user_id: string;
    occurrence_id: number;
    target_time: number;
    profiles?: Profile;
  };

  type Profile = {
    id: number;
    username: string;
  };
}

export {};
