import { useEffect, useState } from 'react'
import './App.css';
import { Chat } from './Chat'
import axios from 'axios'

// On définit la forme d'un article pour que TS nous aide
interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  
  // 1. Charger les articles au démarrage
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      setPosts(response.data)
    } catch (error) {
      console.error("Erreur Backend:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 2. Envoyer un nouvel article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/posts`, { title, content })
      setTitle('')
      setContent('')
      fetchPosts() // Rafraîchir la liste
    } catch (error) {
      alert("Erreur lors de l'ajout. Vérifie la console !")
    }
  }

  const handleDelete =  async(id: number) => {
    if(window.confirm("Supprimer cette article?")){
      try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`)
        fetchPosts()
      }catch(error){
        alert('Erreur lors de la suppression')
      }
    }
  }

  const handleUpdate = async (id: number, currentTitle: string) => {
    const newTitle = window.prompt("Nouveau titre :", currentTitle);
    if (newTitle && newTitle !== currentTitle) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/posts/${id}`, { title: newTitle });
        fetchPosts();
      } catch (error) {
        alert("Erreur lors de la modification");
      }
    }
  };

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Blog Nest + ReactJS CRUD system</h1>

      {/* Formulaire d'ajout */}
      <hr style={{ margin: '40px 0', opacity: 0.2 }} />

      {/* On appelle le composant ici */}
      <section>
        <h2>Chat en temps réel</h2>
        <Chat />
      </section>
      
      <form onSubmit={handleSubmit} className="post-form" >
        <h3>Nouvel Article</h3>
        <input 
          placeholder="Titre (min 5 car.)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Contenu" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" >
          Publier l'article
        </button>
      </form>

      {/* Liste des articles */}
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className='post-card' >
            <h2 >{post.title}</h2>
            <p>{post.content}</p>
            <small>Publié le : {new Date(post.createdAt).toLocaleDateString()}</small>
            &emsp;<button 
            className="delete-btn"
            onClick={() => handleDelete(post.id)}
          >
            Supprimer
          </button>

          <button 
          onClick={() => handleUpdate(post.id, post.title)}
          style={{ marginLeft: '10px', color: 'orange', cursor: 'pointer', border: 'none', background: 'none' }}
        >
          [Modifier]
        </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App