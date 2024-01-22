import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export default function Home() {
    const user = useTracker(() => Meteor.user());

    return (
        <div className="page">
            <div>
                <h2>Boas Vindas ao Advanced To-do List, {user?.profile?.name}! </h2>
            </div>

        </div>
    );
}