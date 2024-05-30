import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    

    return (
        <div className="flex flex-col mx-auto w-full max-wo[1000px]">
            <section className='min-h-screen flex flex-col'>
                
                <main className='flex-1 p-4 flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-4xl'>FreshMarket</h2>
                    <button className='bg-green-600 text-white p-2 hover:bg-gray-400'>
                        Get Started Here
                    </button>
                </main>
            </section>
        </div>
    );
};

export default App;
