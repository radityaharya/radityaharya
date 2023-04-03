

sentences=(
"Hi $USER, Thanks for running this seemingly suspicious script " 
"don't worry, it's absolutely safe" "or is it?" 
"I'm just kidding, it's safe"
"My name is Raditya Harya, I'm an Information Systems Student at Bina Nusantara University"
">Here are some of my contact details"
">Email: contact@radityaharya.com"
">Github: https://github.com/radityaharya.com"
">LinkedIn: https://www.linkedin.com/in/radityaharya/"
)
for sentence in "${sentences[@]}"
do  
    if [[ $sentence == ">"* ]]; then
        sentence=${sentence:1}
        echo -ne "\n$sentence"
    else
        echo -ne "\r\033[K"
        echo -ne "$sentence"
    fi
    sleep 1
done

echo -ne "\n"
