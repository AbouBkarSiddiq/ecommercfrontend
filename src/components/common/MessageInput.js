import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, getAllComments } from '../../redux/actions/adminActions';
import { BallTriangle } from 'react-loader-spinner'

const MessageInput = ({ socket, id }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const userName = localStorage.getItem("userName")
  // const userName = localStorage.getItem("email")
  const productId = id
  const navigate = useNavigate()
  const messageObject = useSelector((state) => state.adminReducer.message)
  const messageList = useSelector((state) => state.adminReducer.messages)
  const isFetchingMessage = useSelector((state) => state.adminReducer.isFetchingMessage)
  console.log("is fetching message:", isFetchingMessage)
  // console.log("Message object at redux.", messageObject)
  console.log("Message List:", messageList)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = ({ message, userName, productId });
    // console.log("Data of input fields:", data)
    dispatch(addComment(data))
    // socket.emit('message', data);
    // socket.emit("comment", data);
    // socket.emit('message', userName);
    setMessage('');
  }

  useEffect(() => {
    setMessages(messageList)
    console.log("How many times it run.")
  }, [messageList])

  useEffect(() => {
    dispatch(getAllComments());
    // console.log("How many times it run.")
  }, [messageObject])

  console.log("Messages set at state:", messages)

  // useEffect(() => {
  //   socket.on("comment", async (data) => {
  //     const data1 = await data ;
  //     console.log('jjjg', data1);
  //   });
  // })

  return (
    <><section style={{ backgroundColor: "#eee" }}>
              <div className="container my-5 py-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12 col-lg-10 col-xl-8">
                    <div className="card">
                      <div className="card-body">
                        <div>
                        {
                          messageList.map(item => (
                            <div className="py-2">
                            <div className="d-flex flex-start align-items-center">
                          <img
                            className="rounded-circle shadow-1-strong me-3 pr-1"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                            alt="avatar"
                            width={50}
                            height={50}
                          />
                          <div>
                            <h6 className="fw-bold text-primary mb-1">{userName}</h6>
                            <p className="text-muted small mb-0">
                              Shared publicly - Jan 2020
                            </p>
                          </div>
                        </div>
                        <p className="" style={{marginTop: '35px', marginLeft: '0px', color: '#778191'}}>{item.message}</p>
                            </div>
                          ))
                        }
                        </div>
                      </div>
                      {(isFetchingMessage && message !== "") ? (<div className="d-flex justify-content-center align-items-center">
                          <BallTriangle color="#d42a33" height={30} width={30} /></div>) : null}
                        <form onSubmit={handleSubmit}>
                          <fieldset>
                      <div
                        className="card-footer py-3 border-0"
                        style={{ backgroundColor: "#f8f9fa" }}
                        >
                        <div className="d-flex flex-start w-100">
                          <img
                            className="rounded-circle shadow-1-strong me-3 pr-1"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                            alt="avatar"
                            width={40}
                            height={40}
                            />
                          <div className="form-outline w-100">
                            <input
                              className="form-control"
                              rows={4}
                              style={{ background: "#fff" }}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              />
                          </div>
                        </div>
                      </div>
                      </fieldset>
                      <div className="float-end mt-2 pt-1">
                          <button type="submit" className="btn btn-primary btn-sm">
                            Post comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </>
  )
}

export default MessageInput

