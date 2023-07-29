# Class Diagram

<div hidden>
@startuml classDiagram
interface IFileSystemCloud {
 +read(options: ReadOptions)
 +write(options: WriteOption)
 +delete(options: DeleteOptions)
 +copy(options: CopyOptions)
 +list(options: ListOptions)
}

class ReadOptions {
 +path: string
 +directory: string
 +encoding: Encoding
}

class DeleteOptions {
 +path: string
 +directory: string
}

class CopyOptions {
 +from: string
 +to: string
 +directory: string
 +toDirectory: string
}

class WriteOptions {
 +data: string | Buffer | Stream
 +path: string
 +directory: string
}

class ListOptions {
 +directory: string
}

enum Encoding {
 +UTF8
 +ASCII
 +UTF16
}

@enduml
</div>

![](classDiagram.png)

Some more markdown