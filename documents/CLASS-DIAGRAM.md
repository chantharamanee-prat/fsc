# Class Diagram

<div style="display: none;">
@startuml classDiagram
interface IFileSystemCloud {
 +read(options: ReadOptions): Promise<FileObject>
 +write(options: WriteOption): Promise<void>
 +delete(options: DeleteOptions): Promise<void>
 +copy(options: CopyOptions): Promise<void>
 +list(options: ListOptions): Promise<FileObject[]>
}

interface ReadOptions {
 +path: string
 +directory: string
 +encoding?: Encoding
 +versionId?: string
}

interface DeleteOptions {
 +path: string
 +directory: string
 +versionId?: string
}

interface CopyOptions {
 +from: string
 +to: string
 +directory: string
 +toDirectory: string
 +versionId?: string
}

interface WriteOptions {
 +data: string | Buffer | Stream
 +path: string
 +directory: string
 +tags: Record<string, string>[]
}

interface ListOptions {
 +directory: string
}

enum Encoding {
 +UTF8
 +ASCII
 +UTF16
}

class FileObject {
 +data: string | Buffer | Stream
 +path: string
 +directory: string
 +tags: Record<string, string>[]
 +versionId?: string
 +contentType?: string
 +contentLength?: number
}

@enduml
</div>

![](classDiagram.png)

This is a class diagram for FSC 