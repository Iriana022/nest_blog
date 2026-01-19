import { useEffect, useState } from 'react'
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
      const response = await axios.get('http://localhost:3000/posts')
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
      await axios.post('http://localhost:3000/posts', { title, content })
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
        await axios.delete(`http://localhost:3000/posts/${id}`)
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
        await axios.patch(`http://localhost:3000/posts/${id}`, { title: newTitle });
        fetchPosts();
      } catch (error) {
        alert("Erreur lors de la modification");
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Blog Nest + ReactJS CRUD system</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        <h3>Nouvel Article</h3>
        <input 
          placeholder="Titre (min 5 car.)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea 
          placeholder="Contenu" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', height: '100px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Publier l'article
        </button>
      </form>

      {/* Liste des articles */}
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
            <h2 style={{ color: '#2c3e50' }}>{post.title}</h2>
            <p>{post.content}</p>
            <small>Publié le : {new Date(post.createdAt).toLocaleDateString()}</small>
            <button 
            onClick={() => handleDelete(post.id)}
            style={{ marginLeft: '20px', color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
          >
            [Supprimer]
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