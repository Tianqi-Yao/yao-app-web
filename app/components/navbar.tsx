import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className='flex gap-2 p-2'>
            <Link href="/">Home</Link>
            <Link href="/searchjobs">SearchJobs</Link>
            <Link href="/fetchwebtool">FetchWebTool</Link>
        </nav>
    )
}