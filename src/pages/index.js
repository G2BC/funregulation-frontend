import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import cytoscape from 'cytoscape'

const inter = Inter({ subsets: ['latin'] })

let cy = cytoscape({

  container: document.getElementById('cy'), // container to render in

  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    {
      data: {id: 'c' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    },
    {
      data: {id: 'aa', source: 'a', target: 'a'}
    },
    {
      data: {id: 'ac', source: 'a', target: 'c'}
    },
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  },
  zoom: 2,
  minZoom: 1,
  maxZoom: 5
});

export default function Home() {

  return (
    <>
      <h1 className="text-3xl font-bold text-stone-500 underline">
      Hello world!
    </h1>
    <div id="cy" className={styles.teste}></div>
    <div className={styles.barralateral}></div>
    </>
  )
}
