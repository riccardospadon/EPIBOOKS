import { useEffect, useState } from "react"
import CommentList from '../CommentList/index.jsx'
import Error from '../Error/index.jsx'
import Loading from '../Loading/index.jsx'
import AddComment from '../AddComment/index.jsx'
import styles from "./style.module.scss"

export default function CommentArea ({ asin, getComments }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getComments = async () => {
            setLoading(true)
            try{
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3ZjhiMDc3Y2RhYTAwMTQ2ZGYzODEiLCJpYXQiOjE2OTg1MDYyMzIsImV4cCI6MTY5OTcxNTgzMn0.NQFKfUGhtKfOR_ohq1noYrZP6rwpvUN_wLplddnPFmU',
                    },
                })
                if(response.ok){
                    let comments = await response.json()
                    setComments(comments)
                    setLoading(false)
                    setError(false)
                } else {
                    console.log('ERROR')
                    setLoading(false)
                    setError(true)
                }
            } catch (error){
                console.log('ERROR')
                setLoading(false)
                setError(true)
            }
        }
        if(asin) {
            getComments()
        }
    }, [asin])

    return(
        <div className="mt-3 text-center">
            {loading && <Loading />}
            {error && <Error />}
            <h2>Add a comment:</h2>
            <AddComment asin={asin} getComments={getComments}/>
            <h2>Comments:</h2>
            <CommentList commentsShow={comments} getComments={getComments}/>
        </div>
    )
}