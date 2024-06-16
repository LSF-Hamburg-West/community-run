declare global {
  type Occurrence = {
    id: number;
    starts_on: string;
    start_time: string;
    events: Event;
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
  };
}

export {};