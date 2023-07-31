# Class Diagram

<!--
@startuml
skinparam handwritten true
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

interface FileObject {
 +data: string | Buffer | Stream
 +path: string
 +directory: string
 +tags: Record<string, string>[]
 +versionId?: string
 +type?: string
 +size?: number
}
@enduml
-->

![](CLASS-DIAGRAM.png)

This is a class diagram for FSC 