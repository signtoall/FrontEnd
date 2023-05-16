export interface activity{
    _id:         string;
    name:        string;
    description: string;
    image:       string;
    url:         string;
}

export interface activityByUser extends activity {
    timeDone:   number;
    isDone:     boolean;
}

export interface alphabet{
    id?: number;
    Letra?: string;
    label?:string;
}

export interface addActivityByUserRequest {
    idActivity: string;
    timeDone:   number;
}

export interface addActivityByUserResponse extends addActivityByUserRequest {
    isDone:     boolean;
}
