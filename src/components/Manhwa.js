import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const providerList = [
    
        {
          id: 1,  
          slug: "luminous",
          name: "Luminous Scans",
          baseURL: "https://luminousscans.com/"
        },
        {
          id: 2,
          slug: "asura",
          name: "Asura Scans",
          baseURL: "https://www.asurascans.com/"
        },
        {
            id: 3,
          slug: "omega",
          name: "Omega Scans",
          baseURL: "https://omegascans.com/"
        },
        {
          id: 4,
          slug: "cosmic",
          name: "Cosmic Scans",
          baseURL: "https://cosmicscans.com/"
        },
        {
          id: 5,
          slug: "night",
          name: "Night Scans",
          baseURL: "https://nightscans.org/"
        },
        {
          id: 6,
          slug: "flame",
          name: "Flame Scans",
          baseURL: "https://flamescans.org/"
        },
        {
            id: 7,
          slug: "void",
          name: "Void Scans",
          baseURL: "https://void-scans.com/"
        },
        {
            id: 8,
          slug: "constellar",
          name: "Constellar Scans",
          baseURL: "https://constellarscans.com/"
        },
        {
            id: 9,
          slug: "surya",
          name: "Surya Scans",
          baseURL: "https://suryascans.com/"
        },
        {
            id: 10,
          slug: "anigli",
          name: "Anigli Scans",
          baseURL: "https://anigliscans.com/"
        },
        {id: 11,
          slug: "arena",
          name: "Arena Scans",
          baseURL: "https://arenascans.net/"
        },
        {
            id: 12,
          slug: "realm",
          name: "Realm Scans",
          baseURL: "https://realmscans.com/"
        }
      
]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Manhwa(){
    const [pageNumber,setPageNumber] = useState(1);
    const [manhwaData, setManhwaData] = useState([]);
    const [selected, setSelected] = useState(providerList
    [1])



    const getManhwaData = () =>{
        fetch(`${process.env.REACT_APP_SPRING_SERVER}/webtoons/${selected.slug}/${pageNumber}`)
        .then((responce) => responce.json())
        .then((data)=> setManhwaData(data))
        .then(console.log(manhwaData))
        .catch((error) => console.error("Error fetching Anime data:", error));

    }

    const handlePageIncrease = () => {
        setPageNumber(pageNumber + 1);
      };
      const handlePageDecrease = () => {
        if(pageNumber > 1)
        setPageNumber(pageNumber - 1);
      };


    return(
        <>
        <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Providers</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {providerList
            .map((provider) => (
                  <Listbox.Option
                    key={provider.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={provider}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {provider.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    {pageNumber === 1 ? (
      <button class="underline decoration-sky-600 hover:decoration-blue-400" onClick={handlePageIncrease}>Next Page</button>
    ) : (
      <>
        <button class="rounded-xl hover:decoration-red-600"  onClick={handlePageDecrease}>Previous Page</button>
        <br></br>
        <button class="rounded-xl hover:decoration-red-600" onClick={handlePageIncrease}>Next Page</button>
      </>
    )}
  </>
    )
}