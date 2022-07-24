import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Todo list
        </h1>
      </main>

      <footer className={styles.footer}>
        <span>All right reserved</span>
      </footer>
    </div>
  )
}
