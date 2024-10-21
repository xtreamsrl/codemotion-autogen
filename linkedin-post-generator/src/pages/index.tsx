'use client'

import {useState, useCallback} from 'react'
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
import {useToast} from "@/hooks/use-toast"
import {Send, Loader2, RefreshCcw, Share2} from "lucide-react"

export default function LinkedInPostGenerator() {
    const [topic, setTopic] = useState('')
    const [generatedPost, setGeneratedPost] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isGenerated, setIsGenerated] = useState(false)
    const {toast} = useToast()

    const handleReset = () => {
        setTopic('')
        setGeneratedPost('')
        setIsGenerated(false)
    }

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(generatedPost).then(() => {
            toast({
                title: "Post copied to clipboard",
            })
            window.open('https://www.linkedin.com/', '_blank')
        }).catch(() => {
            toast({
                title: "Failed to copy",
                description: "An error occurred while copying the post. Please try again.",
                variant: "destructive",
            })
        })
    }, [generatedPost, toast])

    const handleGenerate = async () => {
        setIsLoading(true)
        setIsGenerated(false)
        try {
            const response = await fetch('http://localhost:3001/api/linkedin-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({topic})
            })
            if (!response.ok) {
                throw new Error('Failed to generate post')
            }
            const data = await response.json()
            const content = `${data.content}`
            setGeneratedPost(content)
            setIsGenerated(true)
        } catch (error) {
            console.error('Error generating post:', error)
            setGeneratedPost('Sorry, there was an error generating your post. Please try again.')
            setIsGenerated(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2566FA] to-[#F85C04] p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">LinkedIn Post Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Enter a topic or question for your LinkedIn post"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                    <Button
                        onClick={handleGenerate}
                        disabled={!topic || isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Post <Send className="ml-2 h-4 w-4"/>
                            </>
                        )}
                    </Button>
                    {isGenerated && (
                        <Card className="mt-4 bg-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Generated LinkedIn Post</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap min-h-[200px]">
                                    {generatedPost}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={handleReset}>
                                    <RefreshCcw className="mr-2 h-4 w-4"/>
                                    New Post
                                </Button>
                                <Button onClick={handleShare}>
                                    <Share2 className="mr-2 h-4 w-4"/>
                                    Share on LinkedIn
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </CardContent>
            </Card>
            <footer className="mt-8 text-white text-center">
                <p className="text-sm mt-2">Crafted with ❤️ by xtream with AI 🤖</p>
            </footer>
        </div>
    )
}