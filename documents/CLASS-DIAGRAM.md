# Class Diagram

<!--
@startuml
@startuml
/'!theme sketchy-outline '/
skinparam handwritten true
interface IFileSystemCloud {
 +read(options: ReadOptions): Promise<FileObject>
 +write(options: WriteOption): Promise<FileObject>
 +delete(options: DeleteOptions): Promise<FileObject>
 +copy(options: CopyOptions): Promise<FileObject>
 +list(options: ListOptions): Promise<Paging<FileObject[]>>
 +versions(options: VersionOptions): Promise<Paging<VersionObject[]>>
}


interface ReadOptions {
 +path: string
 +directory: string
 +encoding?: Encoding
 +version?: string
}

interface DeleteOptions {
 +path: string
 +directory: string
 +version?: string
}

interface CopyOptions {
 +from: string
 +to: string
 +directory: string
 +version?: string
}

interface WriteOptions {
 +data: string | Buffer | Stream
 +path: string
 +directory: string
 +encoding?: Encoding
 +tags?: Record<string, string>
}

interface ListOptions {
 +directory: string
}

interface VersionOptions {
 +path: string
 +directory: string
}

enum Encoding {
 +UTF8
 +ASCII
 +UTF16
}

interface FileObject {
 +data?: string | Buffer | ReadableStream 
 +path?: string
 +directory?: string 
 +tags?: Record<string, string>
 +versionId?: string
 +type?: string
 +size?: number
 +date?: Date
 +latest?: boolean
}

interface VersionObject {
 +versionId?: string
 +size?: number
 +date?: Date
 +latest?: boolean
}

interface Paging<T> {
 +data: T
 +next: string
}

class FSC implements IFileSystemCloud {
 -adapter: IFileSystemCloud
}

class AWSS3Adapter implements IFileSystemCloud {
 #client: S3Client
}

class AzureBlobStorageAdapter implements IFileSystemCloud {
 #client: BlobClient
}

FSC o-- AWSS3Adapter
FSC o-- AzureBlobStorageAdapter
@enduml
-->

![](CLASS-DIAGRAM.png)

This is a class diagram for FSC 