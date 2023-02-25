import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db, auth, storage } from './config/firebase';


function App() {

  const [movieList, setMovieList] = useState([])

  // New Movie States

  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  //Update Title State

  const [updatedTitle, setUpdatedTitle] = useState("")

  // File Upload State

  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    // READ THE DATA 
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setMovieList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })

      getMovieList()
    } catch (err) {
      console.error(err)
    }

  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
    getMovieList()
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updatedTitle })
    getMovieList()
  }



  const uploadFile = async () => {
    if (!fileUpload) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className="App">
      <Auth />
      <div>
        <input type="text" onChange={(e) => setNewMovieTitle(e.target.value)} placeholder='Movie title...' />
        <input type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))} placeholder='Release Date...' />
        <input type="checkbox" name="" id="" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label> received An Oscar </label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map(movie => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input type="text" placeholder='new title...' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id,)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} name="" id="" />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
