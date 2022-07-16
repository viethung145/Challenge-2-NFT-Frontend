import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')
import { v4 as uuidv4 } from 'uuid';
import { async } from 'regenerator-runtime'

const pokemonBase64 = "https://i.ibb.co/m0nX6x5/okemon-charmander-png-download-image-pokemon-go-11562933137yupk2hugul.png"

export default function App() {

  return (
    <>
    <div className='fixed top-3 right-3'>
      {window.walletConnection.isSignedIn() ? 
        (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
            Log out
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={login}>
            Log in
          </button>
        )
      }
    </div>
    <div className='container mx-auto mt-10'>
      <h1 className='text-5xl text-center bold'>Catch your Pokemon</h1>
      <div className='mx-auto text-center mt-5'>
        <img src={pokemonBase64} alt="pikachu" className='mx-auto' />
      </div>
      <div className='flex justify-center mt-10'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-1xl font-bold py-2 px-4 rounded" 
        disabled={!window.walletConnection.isSignedIn()}
          onClick={() => {
            if (!window.walletConnection.isSignedIn()) return
            window.contract.nft_mint( 
              {
                token_id: uuidv4(),
                receiver_id: window.accountId,
                token_metadata: {
                  media: pokemonBase64
                }
              },
              "300000000000000",
              "500000000000000000000000"
            )
          }}
        >
          Catch my Pokemon
        </button>
      </div>
    </div>
    </>
  )
}

