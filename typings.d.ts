interface TImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}
export interface TAudio extends SanityBody {
  _type: "audio";
  title: string;
  audio: any;
}

export interface TUser extends SanityBody {
  _type: "user";
  username?: string;
  admin?: boolean;
  image?: TImage;
}

export interface TLesson extends SanityBody {
  _type: "lesson";
  title: string;
  date: string;
  user: TUser;
  dances: TDanceType[];
  content: string;
}

export interface TDanceType extends SanityBody {
  _type: "danceType";
  playlist: TPlaylist;
  name: string;
  history: string;
  description: string;
  image?: TImage;
}
export interface TDance extends SanityBody {
  _type: "dance";
  danceType: TDanceType;
  user: TUser;
}

export interface TMovesType extends SanityBody {
  _type: "moveType";
  title: string;
  level:
    | "beginner"
    | "social foundations"
    | "pre bronze"
    | "int bronze"
    | "sr bronze"
    | "final bronze"
    | "above bronze";
  danceType: TDanceType;
}

export interface TMove extends SanityBody {
  _type: "move";
  user: TUser;
  moveType: TMovesType;
}

export interface TPlaylist extends SanityBody {
  _type: "playlist";
  title: string;
  slug: string;
  songs: TAudio[];
}

export interface TConceptsType extends SanityBody {
  _type: "conceptType";
  title: string;
  description: string;
  level:
    | "beginner"
    | "social foundations"
    | "pre bronze"
    | "int bronze"
    | "sr bronze"
    | "final bronze"
    | "above bronze";
  danceType: TDanceType;
}

export interface TConcepts extends SanityBody {
  _type: "concept";
  user: TUser;
  conceptType: TConceptsType;
}

export interface TSession {
  user: {
    admin: boolean;
    id: string;
    name: string;
  };
  expires: any;
  name: string;
}

export interface TEvent extends SanityBody {
  start: Date;
  end: Date;
  title: string;
  type: "event";
  user?: TUser;
}
