import {GetServerSideProps, NextPage} from "next";


interface CreatePostProps {

}

const PostPage: NextPage<CreatePostProps> = ({}: CreatePostProps) => {
    return (
        <div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {

    return {
        props: {
        }
    }

}

export default PostPage;
