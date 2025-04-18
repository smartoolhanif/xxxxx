"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Download, FileJson, Loader2 } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { FileUpload } from "@/components/ui/file-upload"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

export default function GuestCombiner() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [combinedData, setCombinedData] = useState<Array<{ uid: string; password: string }> | null>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setCombinedData(null)
    setError(null)
  }

  const processFiles = async () => {
    if (files.length === 0) {
      setError("Please upload at least one .dat file")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/combine-guests", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to process files")
      }

      setCombinedData(result.data)
    } catch (err: any) {
      setError(err.message || "An error occurred while processing files")
      setCombinedData(null)
    } finally {
      setLoading(false)
    }
  }

  const downloadJSON = () => {
    if (!combinedData) return

    const jsonString = JSON.stringify(combinedData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url
      downloadLinkRef.current.download = "combined_guests.json"
      downloadLinkRef.current.click()
    }

    // Clean up the URL
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <DashboardLayout
      title="Guest Combiner"
      description="Combine multiple .dat files into a single JSON file with guest account information"
    >
      <KeyboardShortcuts />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Guest Account Combiner</CardTitle>
          <CardDescription>
            Upload .dat files containing guest account information to combine them into a single JSON file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload onFilesSelected={handleFilesSelected} accept=".dat" multiple />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="border-red-800 bg-red-900/30 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {combinedData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Alert className="bg-teal-900/30 border-teal-700/50 text-white">
                  <FileJson className="h-4 w-4 text-teal-400" />
                  <AlertTitle className="text-lg font-bold">Processing Complete</AlertTitle>
                  <AlertDescription className="mt-2">
                    <p>Successfully processed {combinedData.length} guest accounts.</p>
                    <p className="mt-1 text-sm">Click the download button below to get your combined JSON file.</p>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={files.length === 0 || loading} onClick={processFiles}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Process Files"
            )}
          </Button>

          <Button onClick={downloadJSON} disabled={!combinedData || loading} variant="gradient">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>

          {/* Hidden download link */}
          <a ref={downloadLinkRef} className="hidden" />
        </CardFooter>
      </Card>

      {combinedData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Preview</CardTitle>
            <CardDescription>Preview of the combined JSON data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-[#041e2d]/80 rounded-lg p-4 overflow-auto max-h-[400px] border border-teal-500/20">
              <pre className="text-teal-300 text-sm font-mono whitespace-pre-wrap">
                {JSON.stringify(combinedData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  )
}
