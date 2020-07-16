import React from 'react';
import './edit-card-input-field.css';

export default function GlobalClassName({value}) {
    return (
        <input className="edit-card-input" type="text" value={value}/>
    );
}