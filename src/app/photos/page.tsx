"use client";
import GallerySkeleton from "@/components/GallerySkeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const options = { method: "GET", headers: { accept: "application/json" } };

interface Photo {
  id: number;
  url: string;

  title: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `${BASE_URL}/photos?_start=0&_limit=8?page=${page}`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = (await response.json()) as Photo[];
        console.log("PHOTOS DATA >>>>> ", data);
        setPhotos((prevCats) => [...prevCats, ...data]);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-xl font-medium text-black">Cats Data from FreeAPI</h1>
      <section className="p-6">
        <div>
          {error ? (
            <p className="text-red-500">
              Failed to load data. Please reload the page.
            </p>
          ) : isLoading && photos.length === 0 ? (
            <GallerySkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo?.url || "https://via.placeholder.com/200x200"}
                    width={200}
                    height={200}
                    alt={photo?.title}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      {photos.length > 0 && (
        <Button disabled={isLoading} onClick={() => setPage(page + 1)}>
          Show More - {page}
        </Button>
      )}
    </div>
  );
}
