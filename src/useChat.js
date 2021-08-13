
import { useState, useEffect } from 'react'
import { db } from './firebase';

export const useChat = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])

    useEffect(
        () => {
            const unsubscribe = db.collection('messages').orderBy("timestamp", "asc").onSnapshot(
                snapshot => {
                    setLoading(true)
                    setMessages(snapshot.docs.map(d => ({id: d.id, ...d.data() })))
                },
                err => {
                   setError(err)     
                }
            )
            return () => unsubscribe()
        },
        [setMessages]
    )

    

    return { error, loading, messages}
}