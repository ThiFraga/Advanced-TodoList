import React, { useEffect } from "react";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const user = useTracker(() => Meteor.user());

    return (
        <div className="page">
            <div>
                <h2>Boas Vindas ao Advanced To-do List, {user?.username}! </h2>
            </div>

        </div>
    );
}