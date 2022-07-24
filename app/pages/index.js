import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Todo from './components/Todo'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
      </Head>

      <main className={styles.main}>
        <Todo /> 
      </main>

      <footer className={styles.footer}>
        <span>All right reserved</span>
      </footer>
    </div>
  )
}
