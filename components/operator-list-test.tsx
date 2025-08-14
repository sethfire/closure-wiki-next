"use client"

import React, { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"

const PAGE_SIZE = 28

export default function OperatorsClient() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.closure.wiki/en/operators`)
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const paginatedData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className="flex flex-1 flex-col gap-4 p-8 mx-auto w-full max-w-7xl">
      <div>
        <h1 className="text-3xl font-semibold">Operators</h1>
        <div className="text-muted-foreground">
          {loading ? "Loading..." : `Showing ${data.length} operators`}
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : (
          paginatedData.map((char: any) => (
            <a href={`/operators/${char.slug}`} key={char.slug}>
              <div className="group relative aspect-square bg-card rounded overflow-hidden">
                <img
                  src={`https://static.closure.wiki/v1/charavatars/${char.id}.webp`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 text-white px-1 py-2 text-center font-semibold text-xs md:text-sm">
                  {char.isUnreleased && <span className="text-yellow-300">[CN] </span>}
                  {char.name}
                </div>
              </div>
            </a>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex gap-2 mt-6 justify-center">
          <Button
            className=""
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              className=""
              variant="secondary"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            className=""
            variant="secondary"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}