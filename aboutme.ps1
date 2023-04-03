$sentences = @(
    "Hi $env:USERNAME, Thanks for running this seemingly suspicious script",
    "don't worry, it's absolutely safe",
    "or is it?",
    "I'm just kidding, it's safe",
    "My name is Raditya Harya, I'm an Information Systems Student at Bina Nusantara University",
    "Here are some of my contact details",
    "Email: contact@radityaharya.com",
    "Github: https://github.com/radityaharya.com",
    "LinkedIn: https://www.linkedin.com/in/radityaharya/"
)

foreach ($sentence in $sentences) {
    if ($sentence -like ">*") {
        $sentence = $sentence.Substring(1)
        Write-Host -ForegroundColor Yellow $sentence
    } else {
        Write-Host -ForegroundColor White -BackGroundColor Black $sentence
    }
    Start-Sleep -Seconds 1
}

while($true) {
    Start-Sleep -Seconds 1
}