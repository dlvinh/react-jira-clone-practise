import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const user = useSelector(state=> state.UserStateReducer.user);
  return (
    <div>
      {user.id} - {user.name} - {user.avatar}
    </div>
  )
}
